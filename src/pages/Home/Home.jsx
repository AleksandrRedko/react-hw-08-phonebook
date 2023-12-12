import homeImage from '../../images/home.png';
import s from './Home.module.css';

export default function Home() {
  return (
    <>
      <div className={s.container}>
        <img className={s.img} src={homeImage} alt="Welcome" />
      </div>
      <h1 className={s.title}>Welcome to Phonebook!</h1>
      <p className={s.text}>
        Welcome to a Phonebook project! Register now and get started using this
        app. The app give an access to add and store all your contacts, you can
        login and logout.
      </p>
    </>
  );
}
