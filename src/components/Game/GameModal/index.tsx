type Props = {
  isOpen: boolean;
  children?: React.ReactNode;
};

const GameModal = ({ isOpen, children }: Props) => {
  return (
    <article className={`game-board__modal${isOpen ? ' active' : ''}`}>
      {children}
    </article>
  );
};

export default GameModal;
