import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCurrencies} from "../../actions/userActions.js";
import generateApiToken from "../../helpers/generateApiToken.js";

const Header = ({...props}) => {
    const dispatch = useDispatch();

    const token = generateApiToken();

    useEffect(() => {
        dispatch(getCurrencies(token))
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }, [dispatch]);

    return (
        <div>
            <h1>Header</h1>
        </div>
    );
};

export default Header;