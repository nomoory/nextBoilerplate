import { Component } from 'react'

// redux
import withRedux from 'next-redux-wrapper' // redux provider for next
import makeStore from '../src/redux/store'

import Head from 'next/head'; // html head tag
import Link from 'next/link' // component for linking to other pages

import ComponentTemplate from '../src/components/_componentTemplate'


// ACTIONS
import {exampleAction} from '../src/actions'

// STORE
function mapStateToProps ({dataReducer}){
    let { values } = dataReducer.present;
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
        console.log(ComponentTemplate);

        return (
            <div>
                <Head>
                    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
                </Head>
                <div><Link href='/'> home </Link></div>
                <h1> 안녕, Next.js </h1>
                <div> hello1 {this.props.values}</div>
                <ComponentTemplate />
            </div>
        )
    }
}

export default withRedux( makeStore, mapStateToProps )(Index)
