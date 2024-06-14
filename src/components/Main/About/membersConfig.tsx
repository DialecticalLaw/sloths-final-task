import NataliaPhoto from '../../../assets/img/membersPhotos/Natalia.png';
import NataliaReal from '../../../assets/img/membersPhotos/Natalia_real.jpg';
import LeraPhoto from '../../../assets/img/membersPhotos/Lera.png';
import LeraReal from '../../../assets/img/membersPhotos/Lera_real.jpg';
import type { ReactNode } from 'react';
export interface MemberData {
  name: string;
  description: ReactNode;
  photos: string[];
  gitHub: string;
}
const NataliaDescription = (
  <>
    <p>
      С ранних лет я была увлечена спортом и планировала связать свою жизнь с этой сферой. Окончила институт
      физической культуры и спорта Сибирского федерального университета в Красноярске и более 10 лет
      проработала в сфере организации крупных спортивных мероприятий. За это время мне довелось заниматься не
      только организацией и координацией мероприятий, но и поучаствовать в разработке сайтов, информационных
      систем, программного обеспечения и оборудования. Это позволило мне увидеть важность технологий в спорте
      и меня вдохновила идея, что я тоже могу создавать аналогичные продукты и внести свой вклад в развитии
      спортивной сферы и не только.
    </p>
    <p>
      На протяжении последнего года я обучаюсь фронтенд-разработке в RS School. Теперь каждый мой день состоит
      из уникального сочетания страданий при решении задач и поиске ошибок, и удовольствия от полученных
      знаний и успешного разрешения проблем. Для успешного окончания курса, я решила полностью сосредоточиться
      на выполнении финального проекта и уволилась с работы.
    </p>
    <p>
      В свободное время обожаю путешествовать и исследовать новые места, увлекаюсь сноубордом, дайвингом и
      скайранингом. Коллекционирую аккредитации с мероприятий и медали с соревнований. Мечтаю найти идеальный
      баланс между работой и жизнью.
    </p>
  </>
);
const LeraDescription = (
  <>
    <p>Привет!</p>
    <p>Я Лера, мне 29 лет, и я из маленького закрытого города, где даже кошки друг друга знают.</p>
    <p>
      Раньше я была детским врачом-нефрологом, но теперь мои пациенты — строки кода. Да, я сменила стетоскоп
      на клавиатуру и теперь разбираюсь с ошибками в коде, а не в анализах.
    </p>
    <p>
      Обожаю кататься на велосипеде, особенно если можно случайно заехать куда-то не туда и найти приключения.
      Путешествия — это моя страсть! Мечтаю объехать весь мир, от самых шумных мегаполисов до самых тихих
      уголков.
    </p>
    <p>
      Главный факт: я обожаю котов! Они — мои пушистые компаньоны в этом хаотичном мире. Хотя своего кота нет,
      но знаю всех дворовых в радиусе нескольких километров.
    </p>
    <p>
      И да, у меня есть легкая форма дислексии, которая добавляет в мою жизнь пикантные повороты. Если вы
      вдруг найдете грамматические ошибки на нашем сайте, то, скорее всего, это моих рук дело
    </p>
    <p>Так что добро пожаловать в мой мир, где переплетаются код, коты, педали и путешествия!</p>
  </>
);

export const members: MemberData[] = [
  {
    name: 'Валерия',
    description: LeraDescription,
    photos: [LeraPhoto, LeraReal],
    gitHub: 'https://github.com/ValeriiaKuz'
  },
  {
    name: 'Денис',
    description: <></>,
    photos: [],
    gitHub: 'https://github.com/DialecticalLaw'
  },
  {
    name: 'Наталья',
    description: NataliaDescription,
    photos: [NataliaPhoto, NataliaReal],
    gitHub: 'https://github.com/SplitCode'
  }
];
