module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint src/ --ext .ts,.tsx,.cjs,.mjs,.js,.jsx --fix --ignore-path .gitignore",
  ]
};
