// REACT
import { Component } from 'react';
// REDUX
import withRedux from 'next-redux-wrapper';
import makeStore from '../src/redux/store';
// NEXT
import Head from 'next/head';
import Link from 'next/link';

// COMPONENTS
import ComponentTemplate from 'components/Template';

// ACTIONS
import {exampleAction} from 'actions';

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

        return (
            <div>
                <Head>
                    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
                </Head>
                <div><Link href='/'> HOME </Link></div>
                <h1> 안녕, Next.js </h1>
                <div> Go to <Link href= '/template'> template </Link></div>
            </div>
        )
    }
}

export default withRedux( makeStore, mapStateToProps )(Index)
