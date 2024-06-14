import styles from './About.module.css';
import spaceman from '../../../assets/img/spaceman.png';
import type { MemberData } from './membersConfig';
import { members } from './membersConfig';
import { useCallback, useState } from 'react';
import { Member } from './Member';

export function About() {
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);

  const memberClickHandler = useCallback((member: MemberData) => {
    setSelectedMember(member);
  }, []);

  const closeMemberHandler = useCallback(() => {
    setSelectedMember(null);
  }, []);

  return (
    <section className={styles.bg}>
      <h1 className={styles.title}>О нас</h1>
      <div className={styles.info}>
        <p>
          Мы три космонавта-программиста: Денис — капитан нашего звездного судна, Наталья и Лера — супер
          помощницы, готовые к любым задачам в мире кода.
        </p>
        <p>
          Хотите узнать о нас чуть больше? Просто кликните на одного из космонавтов и ознакомьтесь с нашими
          историям!
        </p>
        <p>
          В нашем проекте каждый привнес свою искру таланта! Мы как команда всегда на одной волне. Лера с
          Натальей создали волшебные картинки и запоминающиеся описания, а Денис умело вдохновлял наши идеи
          анимациями и крутыми дизайнерскими штрихами. А что касается логики, то мы разделили её поровну между
          собой, чтобы наш проект был ещё более крутым!
        </p>
      </div>
      <ul className={styles.people}>
        {members.map((member: MemberData) => (
          <li className={styles.astronaut} key={member.name} onClick={() => memberClickHandler(member)}>
            <img src={spaceman} alt={member.name} />
          </li>
        ))}
      </ul>
      {selectedMember && <Member member={selectedMember} onClose={closeMemberHandler} />}
    </section>
  );
}
