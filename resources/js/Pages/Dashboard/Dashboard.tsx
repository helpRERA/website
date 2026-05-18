import React from 'react'
import Card from '../../ui/card/Card'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'

const Dashboard = () => {
  return (
    <PaddedDashboardContent>
      <Card processing={false}>
        <div className=''>
          <img
            className='h-auto w-full'
            src={'splash.svg'}
          />
        </div>
      </Card>
    </PaddedDashboardContent>
  )
}
export default Dashboard
