// import ComponentWith from '../src/components/ReinforcedComponent'
import { bindActionCreators } from 'redux'
import { Component } from 'react'

import Head from 'next/head';
import Link from 'next/link'

// import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper'

import makeStore from '../src/redux/store'

import {exampleAction} from '../src/actions'

class Index extends Component {
    static getInitialProps ({ store, isServer, pathname, query }) {
        //store.dispatch(exampleAction())
        return { isServer }
    }

    constructor(props) {
        super(props);
        this.state = {
            fontSize: 1
        }
    }

    render(){
        let color = 'red';

        return (
            <div>
                <Head>
                    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
                </Head>
                    <style jsx>
                        {`
                            h1 {
                                color: red
                            }
                        `}
                    </style>
                    <h1 >
                        안녕, Next.js
                    </h1>
                    <div onClick={(e)=>{
                        //this.setState({fontSize: this.state.fontSize + 0.5});
                    }} > hello {this.props.value}</div>

                    <div><Link href='/'> home</Link></div>
            </div>
        )
    }
}

export default withRedux( makeStore, state => state.dataReducer )(Index)
