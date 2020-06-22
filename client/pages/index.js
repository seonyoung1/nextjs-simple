import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_PATH } from '../modules/reducers/common';
import { GET_MAIN_REQUEST } from '../modules/reducers/main';

const Index = ({  }) => {
    const dispatch = useDispatch();
    const { pathname } = useSelector(state => state.common);
    const { contents: { title } } = useSelector(state => state.main);

    useEffect(() => {

    }, []);

    return (
        <div>
            pathname:{pathname} <br />
            {/*<p dangerouslySetInnerHTML={{ __html: beyond.desc }}/>*/}
            <p>{title}</p>
        </div>
    );
};

Index.getInitialProps = async context => {
    context.store.dispatch({
        type: GET_MAIN_REQUEST,
    });
    return {
        namespacesRequired: ['common', 'main'],
    };
}

export default Index;
