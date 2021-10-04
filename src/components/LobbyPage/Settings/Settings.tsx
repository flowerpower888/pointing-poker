import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, TimePicker, Switch, Select } from 'antd';
import { Moment } from 'moment';
import './settings.scss';
import {
  CardsSetType,
  Role,
  SettingsType,
} from '../../../models/GameInfoAggregate/GameInfoModel';
import SettingsCard from './SettingsCard';
import memberAPI from '../../../api/memberAPI';

type SettingsPropsType = {
  ownerRole: Role;
  gameId?: string;
  userId?: string;
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
};

type FormValuesType = {
  isOwnerAPlayer: boolean;
  cardsSet: CardsSetType;
  isAutoEnteringPlayers: boolean;
  isChangingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  roundTime: Moment;
};

const Settings: FC<SettingsPropsType> = ({
  settings,
  setSettings,
  ownerRole,
  gameId,
  userId,
}) => {
  const addNewCard = (newValue: string) => {
    setSettings(prevSet => ({
      ...prevSet,
      ownCardsSet: [...prevSet.ownCardsSet, { value: newValue }],
    }));
  };
  const editCard = (oldValue: string, newValue: string) => {
    setSettings(prevSet => {
      const searchedCardIndex = prevSet.ownCardsSet.findIndex(
        card => card.value === oldValue,
      );
      prevSet.ownCardsSet.splice(searchedCardIndex, 1, {
        value: newValue,
      });
      return { ...prevSet, ownCardsSet: [...prevSet.ownCardsSet] };
    });
  };
  const onFormValuesChange = async (values: FormValuesType) => {
    const {
      isOwnerAPlayer,
      cardsSet,
      isAutoEnteringPlayers,
      isChangingCardInRoundEnd,
      isTimerNeeded,
      roundTime,
    } = values;
    if (gameId && userId) {
      await memberAPI.update(gameId, userId, {
        userRole: isOwnerAPlayer ? 'player' : 'observer',
      });
    }
    if (roundTime) {
      const minutes = roundTime.minutes();
      const seconds = roundTime.seconds();
      const secondsInAMinute = 60;
      const roundTimeInSeconds = minutes * secondsInAMinute + seconds;
      setSettings({ ...settings, roundTime: roundTimeInSeconds });
    } else {
      setSettings({
        ...settings,
        cardsSet,
        isAutoEnteringPlayers,
        isChangingCardInRoundEnd,
        isTimerNeeded,
        roundTime,
      });
    }
  };

  return (
    <div className="settings">
      <div className="settings__container">
        <h2 className="lobby-title">Game settings</h2>
        <Form
          layout="horizontal"
          initialValues={{
            ...settings,
            isOwnerAPlayer: ownerRole === 'player',
          }}
          onValuesChange={onFormValuesChange}
        >
          <Form.Item
            label="Scram master as player:"
            name="isOwnerAPlayer"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Automatically admit all new members:"
            name="isAutoEnteringPlayers"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item label="Select cards set" name="cardsSet">
            <Select>
              <Select.Option value="fibonacci">Fibonacci</Select.Option>
              <Select.Option value="powersOfTwo">Powers of two</Select.Option>
              <Select.Option value="own">Make your own cards set</Select.Option>
            </Select>
          </Form.Item>
          {settings.cardsSet === 'own' && (
            <div className="cards">
              {settings.ownCardsSet.map(card => (
                <SettingsCard
                  card={card}
                  key={card.value}
                  editCard={editCard}
                  allCards={settings.ownCardsSet}
                />
              ))}
              <SettingsCard
                key={uuidv4()}
                isAddingCard
                card={{ value: '' }}
                allCards={settings.ownCardsSet}
                addNewCard={addNewCard}
              />
            </div>
          )}
          <Form.Item
            label="Changing card in round end:"
            name="isChangingCardInRoundEnd"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Is timer needed:"
            name="isTimerNeeded"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          {settings.isTimerNeeded && (
            <Form.Item label="Round time:" name="roundTime">
              <TimePicker
                showNow={false}
                popupClassName="timepicker"
                format="mm:ss"
              />
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Settings;
