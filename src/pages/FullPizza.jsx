import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = useState('блаблабла')
    // делает перерисовку компонента также, как и useLocation,
    // если что-то поменяется
    // изменить ид на мокапи на строчки
    // дает понять компоненту о необходимости перерисовки
    // и отрендерить динамически передаваемый параметр
    console.log('id', id)

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://63da4d42b28a3148f683a56f.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении питсы!');
                navigate('/');
            }
        }

        fetchPizza();
    }, [])

    return (
        <div className='container'>
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolorem repellendus error fugiat atque. Quibusdam, voluptas, doloremque quo voluptatem accusantium aperiam debitis, architecto corporis magnam nesciunt animi optio blanditiis repellat.</p>
            <h4>{pizza.price} p.</h4>
        </div>
    )
}

export default FullPizza;