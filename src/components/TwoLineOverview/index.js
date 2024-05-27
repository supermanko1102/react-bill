import classNames from 'classnames'

import './index.scss'

const TwoLineOverview = ({ pay, income }) => {
  return (
    <div className={classNames('twoLineOverview')}>
      <div className="item">
        <span className="money">{Math.abs(pay)}</span>
        <span className="type">支出</span>
      </div>
      <div className="item">
        <span className="money">{income}</span>
        <span className="type">收入</span>
      </div>
      <div className="item">
        <span className="money">{(income + pay)}</span>
        <span className="type">結餘</span>
      </div>
    </div>
  )
}

export default TwoLineOverview
