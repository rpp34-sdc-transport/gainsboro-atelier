import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`

${'' /* @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap'); */}
  * {
    font-family: "Roboto", sans-serif;
  }

  body {
    color: #262626
  }

  h1 {
    font-size: 4rem;
    font-weight: 700;
  }

  h2 {
    font-size: 2rem;
    font-weight: 500;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.25rem;
    font-weight: 500;
  }

  h5 {
    font-size: 1.125rem;
    font-weight: 500;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
  }

  caption {
    font-size: 4rem;
    font-weight: 700;
  }

  .bold {
    font-weight: 500;
  }

  italics {
    font-style: italic;
  }

  .subdued {
    color: #707070
  }

`;

export default GlobalStyle;