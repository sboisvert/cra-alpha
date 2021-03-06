const { css } = require('emotion')

const theme = {
  color: {
    grey: '#595959',
    gray: '#595959',
    greyLight: '#bfc1c3',
    grayLight: '#bfc1c3',
    white: '#ffffff',
    black: '#000000',
    focus: '#ffbf47',
    green: 'aquamarine',
    error: '#b10e1e',
  },
  space: {
    xxs: '5px',
    xs: '10px',
    sm: '15px',
    md: '20px',
    lg: '30px',
    xl: '40px',
    xxl: '60px',
  },
}

const pageMargin = css`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${theme.space.md};
`

const visuallyHidden = css`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  clip: rect(0 0 0 0) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  border: 0 !important;
  white-space: nowrap !important;
`

const buttonStyles = css`
  font: 400 1em sans-serif;
  line-height: 1.1875;
  display: inline-block;
  position: relative;
  width: 100%;
  margin-top: 0;
  padding: 7px 10px;
  border-radius: 0;
  color: ${theme.color.black};
  background-color: ${theme.color.green};
  border: 2px solid ${theme.color.grey};
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  -webkit-appearance: none;
  text-decoration: none;
`

module.exports = {
  theme,
  visuallyHidden,
  buttonStyles,
  pageMargin,
}
