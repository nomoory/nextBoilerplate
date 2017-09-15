import { Component } from 'react'

// redux
import withRedux from 'next-redux-wrapper' // redux provider for next
import makeStore from '../src/redux/store'
import {exampleAction} from '../src/actions'

import Head from 'next/head'; // html head tag
import Link from 'next/link' // component for linking to other pages

// ACTIONS
import {exampleAction} from '../../actions'

// STORE
function mapStateToProps ({dataReducer}){
    let { values } = dataReducer;
    return { values }
}

class Index extends Component {
    static getInitialProps ({ store, isServer, pathname, query }) {
        //store.dispatch(exampleAction())
        return { isServer }
    }

    constructor(props) {
        super(props);
    }

    render(){
        let color = 'red';

        return (
            <div>
                <Head>
                    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
                </Head>
                <div><Link href='/'> home </Link></div>
                <h1> 안녕, Next.js </h1>
                <div> hello {this.props.values}</div>
                <ComponentTemplate />
            </div>
        )
    }
}

export default withRedux( makeStore, mapStateToProps )(Index)
