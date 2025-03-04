import { Button, Image } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import style from './collapse.module.scss';
import CommandIcon from '/public/illustrations_role.svg';
import { TTeam } from '../../types/matches';
import Avatar from '/public/avatar_global.svg';

const Collapse = ({
  firstCommandName,
  secondCommandName,
  score,
  status,
  key,
  homeTeam,
  awayTeam,
}: {
  firstCommandName: string;
  secondCommandName: string;
  score: string;
  status: string;
  key: string | number;
  homeTeam: TTeam;
  awayTeam: TTeam;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };

  const screenWidth = window.screen.width;

  return (
    <div style={{ backgroundColor: '#0C0E13' }}>
      <div
        className={style.container}
        key={key}
        style={{
          marginBottom: collapsed ? '0' : '14px',
          borderRadius: collapsed ? '5px 5px 0 0' : '5px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
          className={style.teamContainer}
        >
          <div className={style.team}>
            <Image preview={false} src={CommandIcon} className={style.image} />
            <div className={style.teamName}>{firstCommandName}</div>
          </div>
          <div className={style.score}>
            <div>{score}</div>
            <div
              className={style.status}
              style={{
                backgroundColor:
                  status === 'Scheduled'
                    ? '#EB6402'
                    : status === 'Ongoing'
                    ? '#43AD28'
                    : '#EB0237',
              }}
            >
              {status}
            </div>
          </div>
          <div className={style.team}>
            <div className={style.teamName}>{secondCommandName}</div>
            <Image preview={false} src={CommandIcon} className={style.image} />
            <Button
              icon={collapsed ? <UpOutlined /> : <DownOutlined />}
              className={style.collapseButton}
              onClick={toggleCollapse}
            />
          </div>
        </div>
      </div>
      {collapsed ? (
        <div className={style.colContainer}>
          <div className={style.column}>
            <div className={style.row}>
              {homeTeam.players.map((player) => (
                <div className={style.player}>
                  <div className={style.playerInfo}>
                    <div
                      style={{
                        gap: '5px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        src={Avatar}
                        width={32}
                        height={32}
                        preview={false}
                      />
                      <span>{player.username}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>Убийств: {player.kills}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.row2}>
              <span>Points: +{homeTeam.points}</span>
              <span>Место: {homeTeam.place}</span>
              <span>Всего убийств: {homeTeam.total_kills}</span>
            </div>
          </div>
          {screenWidth < 768 ? <div className={style.vs}>VS</div> : ''}
          <div className={style.column}>
            <div className={style.row}>
              {awayTeam.players.map((player) => (
                <div className={style.player}>
                  <div className={style.playerInfo}>
                    <div
                      style={{
                        gap: '5px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        src={Avatar}
                        width={32}
                        height={32}
                        preview={false}
                      />
                      <span>{player.username}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>Убийств: {player.kills}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.row2}>
              <span>Points: +{awayTeam.points}</span>
              <span>Место: {awayTeam.place}</span>
              <span>Всего убийств: {awayTeam.total_kills}</span>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {screenWidth < 768 ? (
        <Button
          icon={
            collapsed ? (
              <UpOutlined width={28} height={28} />
            ) : (
              <DownOutlined width={28} height={28} />
            )
          }
          className={style.collapseButtonBottom}
          style={{
            backgroundColor: 'inherit',
            border: 'none',
            paddingTop: '8px',
            width: '100%',
          }}
          onClick={toggleCollapse}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Collapse;
