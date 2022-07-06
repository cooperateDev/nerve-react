import BalanceInputContainer from "../components/BalanceInputContainer";
import BaseButton from "../components/BaseButton";

export default function InteractiveInputRow({
  title,
  balanceStr,
  onClickBalance,
  value,
  placeholder,
  onChange,
  disabled,
  onClickEnter,
  buttonLabel,
  icon,
  showButton = true,
}) {
  let titleContent;
  if (icon) {
    titleContent = (
      <div className="inline-block pb-1">
        <img className="w-5 mr-2.5 -mt-1 inline-block" alt="icon" src={icon} />
        <div className="inline-block ">{title}</div>
      </div>
    );
  } else {
    titleContent = title;
  }

  return (
    <div className="mt-4">
      <div className="inline-flex items-center space-x-2 w-full">
        {/* { icon &&
          <img className='w-8 mr-2.5 mt-5 inline-block' alt='icon' src={icon} />
        } */}
        <BalanceInputContainer
          title={titleContent}
          balanceStr={balanceStr}
          className="w-full"
          onClickBalance={onClickBalance}
        >
          <input
            className="bg-transparent block w-full border border-gray-300 hover:border-gray-400 rounded-md pl-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 "
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        </BalanceInputContainer>
        {showButton && (
          <BaseButton
            className="w-2/5 max-w-content mt-5"
            disabled={disabled}
            onClick={onClickEnter}
          >
            {buttonLabel ?? title}
          </BaseButton>
        )}
      </div>
    </div>
  );
}
