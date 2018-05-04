import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import WebLayout from './layout'
import {Button} from 'antd'
import * as actionCreators from '../redux/actions'

function Home({count, increase, decrease}) {
  return (
    <WebLayout>
      <div>
        Some state changes: {count.number}
        <br/>
        <Button type="primary" onClick={() => increase(1)}>Increase</Button>
        {' '}
        <Button type="primary" onClick={() => decrease(1)}>Decrease</Button>
      </div>
    </WebLayout>
  )
}

// export default connect(state => ({number: state.count.number}), {increase,
// decrease})(Home)

const mapStateToProps = state => ({count: state.count})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
