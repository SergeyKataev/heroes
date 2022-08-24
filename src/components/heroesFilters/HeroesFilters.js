// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {useEffect} from "react";
import {filterFetched, filterFetching, heroesFetched, heroesFetching, heroesFetchingError} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";

const HeroesFilters = () => {
    const {filters, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filterFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filterFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
        // eslint-disable-next-line
    }, []);


    const renderHeroesList = (arr) => {
        console.log(arr);
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не подгрузились</h5>
        }

        return arr.map(({name, alias, className}) => {
            let style = `btn ${className}`;
            if (name === 'all') {
                style = style.concat(' active');
            }
            return <button className={style}>{alias}</button>
        })
    }

    const elements = renderHeroesList(filters);

    return (
        <ul>
            {elements}
        </ul>
    )

}

export default HeroesFilters;