export { default as Chat } from './chat.hbs?raw';

import {RightSide} from "./right-side";
import {LeftSideHeader} from "./left-side/left-side-header";
import {ChatCard} from "./left-side/chat-card";
import Handlebars from "handlebars";

Handlebars.registerPartial('RightSide', RightSide);
Handlebars.registerPartial('LeftSideHeader', LeftSideHeader);
Handlebars.registerPartial('ChatCard', ChatCard);

Handlebars.registerHelper('chats', () => {
    return [
        {
            chatName: "Андрей" ,
            lastMessage: "Изображение",
            time: "10:49",
            countUnread: 2,
        },
        {
            chatName: "Киноклуб" ,
            lastMessage: "Вы: стикер",
            time: "12:00",
        },
        {
            chatName: "Илья" ,
            lastMessage: "Друзья, у меня для вас особенный выпуск новостей!...",
            time: "15:12",
            countUnread: 4,
        },
        {
            chatName: "Вадим" ,
            lastMessage: "Вы: Круто!",
            time: "Пт",
        },
        {
            chatName: "тет-а-теты" ,
            lastMessage: "И Human Interface Guidelines и Material Design рекомендуют...",
            time: "Ср",
        },
        {
            chatName: "1, 2, 3" ,
            lastMessage: "Миллионы россиян ежедневно проводят десятки часов свое...",
            time: "Пн",
        },
        {
            chatName: "Design Destroyer" ,
            lastMessage: "В 2008 году художник Jon Rafman  начал собирать...",
            time: "Пн",
        },
        {
            chatName: "Day." ,
            lastMessage: "Так увлёкся работой по курсу, что совсем забыл его анонсир...",
            time: "1 Мая 2020",
        },
    ]
})

