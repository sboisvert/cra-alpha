const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const SummaryTable = require('../components/SummaryTable.js')

const dashboard = css`
  position: relative;

  > div {
    margin-bottom: ${theme.space.lg};
  }
`

const makeRows = ({ sin, dobDay, dobMonth, dobYear, name, address }) => {
  return [
    { key: 'Name', value: name },
    { key: 'Social Insurance Number', value: sin },
    { key: 'Date of Birth', value: [dobDay, dobMonth, dobYear].join('-') },
    { key: 'Mailing address', value: address },
  ]
}

const Dashboard = ({ data = {} }) =>
  html`
    <${Layout}>
      <div class=${dashboard}>
        <h1>Dashboard</h1>
        <div>
          <${SummaryTable} rows=${makeRows(data)} //>
        </div>
      </div>
    </${Layout}>
  `

module.exports = Dashboard
