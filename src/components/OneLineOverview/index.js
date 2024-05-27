import './index.scss'

const OneLineOverview = ({ pay, income }) => {
  return (
    <div className="oneLineOverview">
      <div className="pay">
        <span className="type">支出</span>
        <span className="money">{Math.abs(pay)}</span>
      </div>
      <div className="income">
        <span className="type">收入</span>
        <span className="money">{income}</span>
      </div>
      <div className="balance">
        <span className="money">{(income + pay)}</span>
        <span className="type">結餘</span>
      </div>
    </div>
  )
}

export default OneLineOverview
