// REACT
import { Component } from 'react';

// REDUX
import withRedux from 'next-redux-wrapper';
import makeStore from 'redux/store';

// NEXT
import Head from 'next/head';
import Link from 'next/link';

// COMPONENT
import TemplateApp from 'apps/TemplateApp';
import TemplateComponent from 'components/TemplateComponent';

// STORE
function mapStateToProps ({dataReducer}){
    // let { values } = dataReducer;
    return { /* values */ }
}

class Page extends Component {
    static async getInitialProps ({ store, isServer, pathname, query }) {
        //store.dispatch(exampleAction())
        return { isServer }
    }

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <TemplateApp>
                <TemplateComponent/>
            </TemplateApp>
        )
    }
}

export default withRedux( makeStore, mapStateToProps )(Page)
