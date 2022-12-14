// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import {useDispatch, useSelector} from "react-redux";
import {heroesAdd, heroesFetched, heroesFetching, heroesFetchingError} from "../../actions";
import {v4 as uuidv4} from "uuid";
import {useHttp} from "../../hooks/http.hook";
import {useEffect} from "react";
import data from "bootstrap/js/src/dom/data";


const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmit = (e) => {
        e.preventDefault();
        const hero =
            {
                id: uuidv4(),
                name: e.target[0].value,
                description: e.target[1].value,
                element: e.target[2].value
            }

        request("http://localhost:3001/heroes", 'POST', JSON.stringify(hero))
            .then(() => {
                    dispatch(heroesAdd(hero));
                }
            )
            .catch(() => dispatch(heroesFetchingError()))
    }


    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element">
                    <option>Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;