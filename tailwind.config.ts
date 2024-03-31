const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Redline3D: ["Redline3D", "sans-serif"],
      VemanemPro: ["VemanemPro", "sans-serif"],
      Neoteric: ["Neoteric", "sans-serif"],

      CfNight: ["CfNightOfTerrorPersonalRegular", "sans-serif"],
      Meltdownmf: ["Meltdownmf", "sans-serif"],
      Mrmonstar: ["Mrmonstar", "sans-serif"],
      Psycho: ["PsychopersonaluseRegular", "sans-serif"],
      DripinkpersonaluseBlack: ["DripinkpersonaluseBlack", "sans-serif"],
      GacorPersonalUse: ["GacorPersonalUse", "sans-serif"],
      schwifty: ["schwifty", "sans-serif"],
      getSchwifty: ["getSchwifty", "sans-serif"],
    },
    
  },
  plugins: [],
});