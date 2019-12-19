import React from 'react';

interface Props {
  text?: string;
}

const Loading: React.FC<Props> = ({ text = 'Loading' }) => {
  const [loadingText, setLoadingText] = React.useState(text);

  React.useEffect(() => {
    const stopper = text + '...';
    const id = window.setInterval(() => {
      loadingText === stopper
        ? setLoadingText(text)
        : setLoadingText(t => t + '.');
    }, 200);

    return () => window.clearInterval(id);
  }, [text, loadingText]);

  return <h1 style={{ textAlign: 'center' }}>{loadingText}</h1>;
};

export default Loading;
