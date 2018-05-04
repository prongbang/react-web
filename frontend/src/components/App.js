import React from 'react'
import {createBrowserHistory} from 'history'
import {Link} from "react-router-dom"
import {Button} from 'antd'
import WebLayout from './layout'

export default function App({children}) {
  return (
    <WebLayout>
      <header>
          <h1>Hello React on Docker</h1>
      </header>
    </WebLayout>
  )
}
