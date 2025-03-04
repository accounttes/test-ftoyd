import { Layout, Spin } from 'antd';
import { Navbar } from '../components/navbar/Navbar';
import style from './mainLayout.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useMatches } from '../hooks/matches';
import Collapse from '../components/collapse/Collapse';
import { useMatchStore } from '../store/store';
import { LoadingOutlined } from '@ant-design/icons';
import { socketUrl } from '../plugins/axios';
import { TMatch } from '../types/matches';

interface WebSocketMessage {
  type: string;
  data: TMatch[];
}

const MainLayout = () => {
  const { getMatches } = useMatches();
  const { matches, setMatches, filter } = useMatchStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);

  const fetchMatches = () => {
    setLoading(true);
    getMatches()
      .then((res) => {
        setMatches(res.matches);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Ошибка: не удалось загрузить информацию', err);
        setError('Failed to load matches. Please try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMatches();

    if (!socketRef.current) {
      try {
        const socket = new WebSocket(socketUrl);
        socketRef.current = socket;

        socket.onopen = () => {
          console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);

            if (
              message.type === 'update_matches' &&
              Array.isArray(message.data)
            ) {
              setMatches(message.data);
            } else {
              console.warn('Received unknown message type:', message.type);
            }
          } catch (err) {
            console.error('Error parsing WebSocket data:', err);
            setError('Error processing live updates');
          }
        };

        socket.onerror = (err) => {
          console.error('WebSocket error:', err);
          setError('WebSocket connection error. Live updates may not work.');
        };

        socket.onclose = (event) => {
          console.log('WebSocket connection closed:', event.code, event.reason);
          socketRef.current = null;

          if (event.code !== 1000) {
            setError('WebSocket connection closed unexpectedly');
          }
        };
      } catch (err) {
        console.error('Failed to establish WebSocket connection:', err);
        setError('Failed to connect to live updates server');
      }
    }

    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  const filteredMatches = matches?.filter((match) => {
    if (filter === 'all') {
      return true;
    }
    return match.status.toLowerCase() === filter.toLowerCase();
  });

  const { Content } = Layout;

  return (
    <Layout>
      <Navbar socket={!error} />
      {loading ? (
        <div className={style.loading}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <Content className={style.layout}>
          {filteredMatches?.length > 0 ? (
            filteredMatches.map((match, index) => (
              <Collapse
                key={index}
                firstCommandName={match.homeTeam.name}
                secondCommandName={match.awayTeam.name}
                score={match.homeScore + ':' + match.awayScore}
                status={match.status}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
              />
            ))
          ) : (
            <div className={style.noMatches}>No matches found</div>
          )}
        </Content>
      )}
    </Layout>
  );
};

export default MainLayout;
