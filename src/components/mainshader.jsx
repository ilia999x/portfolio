import React from "react";
import ReactDOM from "react-dom";
import ShadertoyReact from "shadertoy-react";

/**
 * Playground shadertoy-react:
 * https://www.npmjs.com/package/shadertoy-react
 *
 * Built-in uniforms (Can be used directly in your shader)
 * float iTime -- shader playback time (in seconds).
 * float iTimeDelta -- Render time (in seconds).
 * int iFrame -- Shader playback frame.
 * vec2 iResolution -- viewport resolution (in pixels).
 * vec4 iDate -- (year, month, day, time in seconds).
 * vec4 iMouse -- mouse pixel coords. xy: current (if MLB down), zw: click.
 * sampler2D iChannel^n -- The textures input channel you've passed; numbered in the same order as the textures passed as prop in your react component.
 * vec3 iChannelResolution[n] -- An array containing the texture channel resolution (in pixels).
 * vec4 iDeviceOrientation -- Raw data from device orientation where respectively x: Alpha, y: Beta, z: Gamma and w: window.orientation.
 */

// Classic glsl syntax
const fragmentShader = `
#define MAXDIST 22.
#define GIFLENGTH 1.570795

struct Ray {
	vec3 ro;
    vec3 rd;
};

void pR(inout vec2 p, float a) {
	p = cos(a)*p + sin(a)*vec2(p.y, -p.x);
}

float length6( vec3 p )
{
	p = p*p*p; p = p*p;
	return pow( p.x + p.y + p.z, 1.0/6.0 );
}

float fractal(vec3 p)
{
   	float len = length(p);
    p=p.yxz;

    float scale = 1.38;
    const int iterations = 25;
    float a = iTime;
	float l = 0.;
    
    vec2 rotationAnimAmp = vec2(0.05,0.08);
	vec2 rotationPhase = vec2(.49 + sin(iTime*8. + len*0.2) * 0.025,0.15 + cos(-0.2+iTime*4. + len*0.2) * 0.08);
	
    // uncomment this to find good spots with the mouse :)
    //m = iMouse.xy / iResolution.xy;
    
    vec3 juliaOffset = vec3(-3.,-1.15,-.5);
    
    pR(p.xy,.5+sin(-0.25+iTime*4.)*0.1);
    
    for (int i=0; i<iterations; i++) {
		p = abs(p);
        // scale and offset the position
		p = p*scale + juliaOffset;
        
        // Rotate the position
        pR(p.xz,rotationPhase.x*3.14 + cos(iTime*4. + len)*rotationAnimAmp.y);
		pR(p.yz,rotationPhase.y*3.14 + sin(iTime*4. + len)*rotationAnimAmp.x);		
        l=length6(p);
	}
	return l*pow(scale, -float(iterations))-.25;
}

vec2 map(vec3 pos) {
    float l = length(pos);

    float dist = fractal(pos);

    return vec2(dist, 0.);
}

vec2 march(Ray ray) 
{
    const int steps = 30;
    const float prec = 0.001;
    vec2 res = vec2(0.);
    
    for (int i = 0; i < steps; i++) 
    {        
        vec2 s = map(ray.ro + ray.rd * res.x);
        
        if (res.x > MAXDIST || s.x < prec) 
        {
        	break;    
        }
        
        res.x += s.x;
        res.y = s.y;
        
    }
   
    return res;
}

vec3 calcNormal(vec3 pos) 
{
	const vec3 eps = vec3(0.005, 0.0, 0.0);
                          
    return normalize(
        vec3(map(pos + eps).x - map(pos - eps).x,
             map(pos + eps.yxz).x - map(pos - eps.yxz).x,
             map(pos + eps.yzx).x - map(pos - eps.yzx).x ) 
    );
}

float calcAO( in vec3 pos, in vec3 nor )
{
float occ = 0.0;
    float sca = 1.0;
    for( int i=0; i<5; i++ )
    {
        float hr = 0.2*float(i)/2.0;
        vec3 aopos =  nor * hr + pos;
        float dd = map( aopos ).x;
        occ += -(dd-hr)*sca;
        sca *= .95;
    }
    return clamp( 1.0 - 2.0*occ, 0.0, 1.0 );    
}
vec4 render(Ray ray) 
{
    vec3 col = vec3(0.);
	vec2 res = march(ray);
   
    if (res.x > MAXDIST) 
    {
        return vec4(col, MAXDIST);
    }
    
    vec3 p = ray.ro+res.x*ray.rd;
    vec3 normal = calcNormal(p);
    vec3 pos = p;
    ray.ro = pos;
    // color with ambient occlusion
   	col = vec3(pow(calcAO(p, normal), 3.2))*0.5;
   
    col = mix(col, vec3(0.), clamp(res.x/MAXDIST, 0., 1.));
   	return vec4(col, res.x);
}

mat3 camera(in vec3 ro, in vec3 rd, float rot) 
{
	vec3 forward = normalize(rd - ro);
    vec3 worldUp = vec3(sin(rot), cos(rot), 0.0);
    vec3 x = normalize(cross(forward, worldUp));
    vec3 y = normalize(cross(x, forward));
    return mat3(x, y, forward);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    
    vec3 camPos = vec3(9., 6.5, 12.);
    vec3 camDir = camPos + vec3(-.85, -.4, -0.5);
    mat3 cam = camera(camPos, camDir, 0.);
    
    vec3 rayDir = cam * normalize( vec3(uv, 1. + sin(iTime*4.)*0.05) );
    
    Ray ray;
    ray.ro = camPos;
    ray.rd = rayDir;
    
    vec4 col = render(ray);
    col.xyz = pow(col.xyz, vec3(0.6));
	fragColor = vec4(col.xyz,clamp(1.-col.w/MAXDIST, 0., 1.));
}
`;

export default () => <ShadertoyReact fs={fragmentShader} />;
