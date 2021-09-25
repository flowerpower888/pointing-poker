import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, TimePicker, Switch, Select, Col } from 'antd';
import './settings.scss';
import {
  SettingsCardsType,
  SettingsType,
} from '../../../models/GameInfoAggregate/GameInfoModel';
import SettingsCard from './SettingsCard';

type SettingsPropsType = {
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
};

type FormValuesType = {
  isOwnerAPlayer?: boolean;
  cardsSet?: 'fibonacci' | 'own';
  isAutoEnteringPlayers?: boolean;
  isAutoReversingCardsAfterVoting?: boolean;
  isChangingCardInRoundEnd?: boolean;
  isTimerNeeded?: boolean;
  roundTime?: any;
};

const Settings: FC<SettingsPropsType> = ({ settings, setSettings }) => {
  const addNewCard = (cardValue: number, id: string) => {
    setSettings(prevSet => ({
      ...prevSet,
      ownCardsSet: [...prevSet.ownCardsSet, { value: cardValue, id }],
    }));
  };
  const editCard = (cardValue: number, id: string) => {
    setSettings(prevSet => {
      const searchedCardIndex = prevSet.ownCardsSet.findIndex(
        card => card.id === id,
      );
      prevSet.ownCardsSet.splice(searchedCardIndex, 1, {
        value: cardValue,
        id,
      });
      return { ...prevSet, ownCardsSet: [...prevSet.ownCardsSet] };
    });
  };
  const onFormValuesChange = (values: FormValuesType) => {
    if (values.roundTime) {
      const minutes = values.roundTime.minutes();
      const seconds = values.roundTime.seconds();
      const secondsInAMinute = 60;
      const roundTimeInSeconds = minutes * secondsInAMinute + seconds;
      setSettings({ ...settings, roundTime: roundTimeInSeconds });
    } else {
      setSettings({ ...settings, ...values });
    }
  };

  return (
    <div className="settings">
      <div className="settings__container">
        <h2 className="lobby-title">Game settings</h2>
        <Form
          layout="horizontal"
          initialValues={settings}
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
          <Form.Item
            label="Automatically reverse cards after voting:"
            name="isAutoReversingCardsAfterVoting"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item label="Select cards set" name="cardsSet">
            <Select>
              <Select.Option value="fibonacci">Fibonacci</Select.Option>
              <Select.Option value="own">Make an own cards set</Select.Option>
            </Select>
          </Form.Item>
          {settings.cardsSet === 'own' && (
            <div className="cards">
              {settings.ownCardsSet.map(card => (
                <SettingsCard card={card} key={card.id} editCard={editCard} />
              ))}
              <SettingsCard
                key={uuidv4()}
                isAddingCard
                card={{ value: 0, id: uuidv4() }}
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
