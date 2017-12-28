import contain from './Container'

// NEXT
import Head from 'next/head';

// SUBCOMPONENTS

var Present = ({ props, state, style, functions}) => {
    let { children } = props;
    // let { } = state;
    // let { } = functions;
    return (
        <div id='admin-console-container' style={style.mainStyle}>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="stylesheet" href="static/css/global.css" />
                <link rel="stylesheet" href="static/font/NanumGothicBold.ttf" />
                {/*<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>*/}
            </Head>
            {children}
        </div>
    )
}

export default contain(Present)
