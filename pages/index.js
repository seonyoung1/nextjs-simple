import React, { useEffect } from 'react';
import { i18n, withTranslation } from "../i18n";
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_PATH } from '../store/reducers/common';
import { GET_MAIN_REQUEST } from '../store/reducers/main';

const Index = ({ t, locale }) => {
    const dispatch = useDispatch();
    const { pathname } = useSelector(state => state.common);
    const { contents: { beyond } } = useSelector(state => state.main);

    useEffect(() => {
        dispatch({
            type: ACTION_PATH,
            pathname: locale,
        })
    }, [locale]);

    return (
        <div>
            pathname:{pathname} <br />
            locale:{locale} <br />
            t:{t('common:more')}<br />
            <p dangerouslySetInnerHTML={{ __html: beyond.desc }}/>
        </div>
    );
};

Index.getInitialProps = async context => {
    const locale = context.req ? context.req.language : i18n.language;
    context.store.dispatch({
        type: GET_MAIN_REQUEST,
        locale,
    })
    return {
        namespacesRequired: ['common', 'main'],
        locale,
    };
}

export default withTranslation('common')(Index);
