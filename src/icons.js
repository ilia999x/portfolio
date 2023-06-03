export { ReactComponent as DigitaloceanIcon } from './icons/digitalocean.svg';
import { ReactComponent as kubernetesIcon } from './icons/kubernetes.svg';
import { Icon } from '@chakra-ui/react';

// export const Digitalocean=()=>(
//         <Icon viewBox='0 0 10 10' color='red.500' >
//             <DigitaloceanIcon/>
//         </Icon>
//     );

export const Kubernetes=()=>(
    <Icon viewBox='0 0 200 200' color='red.500'>
        <kubernetesIcon/>
    </Icon>
);

//   import { createIcon } from '@chakra-ui/icons'

//   // using `path`
//   export const UpDownIcon = createIcon({
//     displayName: 'UpDownIcon',
//     viewBox: '0 0 200 200',
//     // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
//     path: (
//       <path
//         fill='currentColor'
//         d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
//       />
//     ),
//   })