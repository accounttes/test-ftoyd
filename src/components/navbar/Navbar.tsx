import { Button, Image } from 'antd';
import style from './navbar.module.scss';
import Refresh from '/public/Refresh.svg';
import { useMatches } from '../../hooks/matches';
import { useMatchStore } from '../../store/store';
import Alert from '/alert-triangle.svg';
import { useEffect, useState } from 'react';

export const Navbar = ({ socket }: { socket: boolean }) => {
  const { getMatches } = useMatches();
  const { setMatches, filter, setFilter } = useMatchStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSelectChange = (e: string) => {
    setFilter(e);
  };

  const fetchMatches = () => {
    setLoading(true);
    getMatches()
      .then((res) => {
        setMatches(res.matches);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const selectOptions = [
    { value: 'all', label: 'Все' },
    { value: 'scheduled', label: 'Запланированные' },
    { value: 'ongoing', label: 'Идущие' },
    { value: 'finished', label: 'Завершенные' },
  ];

  return (
    <nav className={style.navbar}>
      <div className={style.titleContainer}>
        <p className={style.title}>Match Tracker</p>
        <select
          name='status'
          className={style.select}
          onChange={(e) => handleSelectChange(e.target.value)}
          value={filter}
        >
          {selectOptions.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className={style.buttons}>
        {error || !socket ? (
          <div className={style.error}>
            <Image src={Alert} preview={false} width={28} height={28} />{' '}
            <span style={{ fontSize: '18px' }}>
              Ошибка: не удалось загрузить информацию
            </span>
          </div>
        ) : (
          ''
        )}
        <Button
          className={style.refresh}
          type='primary'
          onClick={() => fetchMatches()}
        >
          <div className={style.refreshContainer}>
            <span>Обновить</span>{' '}
            <Image
              preview={false}
              src={Refresh}
              className={loading ? style.rotating : ''}
            />
          </div>
        </Button>
      </div>
    </nav>
  );
};
