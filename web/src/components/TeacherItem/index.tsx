import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/43932907?s=460&u=c5ee08d530eaf1cc3693c608669abc1944ed0313&v=4" alt="Gustavo Bedendo"/>
                <div>
                    <strong>Gustavo Bedendo</strong>
                    <span>WebDev</span>
                </div>
            </header>

            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                <br/><br/>
                Sunt ducimus quibusdam ipsam enim explicabo. Nihil, ad incidunt dignissimos voluptate alias voluptatibus esse. Fuga ullam esse eveniet nostrum quibusdam cumque alias!
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em Contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;