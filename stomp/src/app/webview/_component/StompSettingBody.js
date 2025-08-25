import Button from 'components/button/Button';
import RadioButtonGroup from 'components/button/RadioButtonGroup';
import Checkbox from 'components/checkBox/Checkbox';
import Textarea from 'components/input/Textarea';
import TextInput from 'components/input/TextInput';
import { useState } from 'react';
import './StompSettingBody.css';

const StompSettingBody = () => {
  const [protocol, setProtocol] = useState('ws');
  const [host, setHost] = useState();
  const [token, setToken] = useState();
  const [isAuthorizationChecked, setIsAuthorizationChecked] = useState(false);
  const [subDestination, setSubDestination] = useState('');
  const [pubDestination, setPubDestination] = useState('');
  const log = '';

  return (
    <>
      <div className="container">
        <div id="connection-setting">
          <div>
            <RadioButtonGroup
              name={'protocol'}
              options={[
                { value: 'ws', label: 'ws' },
                { value: 'wss', label: 'wss' },
              ]}
              selectedValue={protocol}
              onChange={(changedValue) => {
                setProtocol(changedValue);
              }}
            />
          </div>
          <div>
            <TextInput
              label={'host'}
              value={host}
              onChange={(changeValue) => {
                setHost(changeValue);
              }}
            />
          </div>
          <div>
            <Checkbox
              label="Authorization"
              checked={isAuthorizationChecked}
              onChange={(changedValue) => {
                setIsAuthorizationChecked(changedValue);
              }}
            />
            <TextInput
              label={''}
              value={token}
              disabled={!isAuthorizationChecked}
              placeholder={'Bearer token'}
              onChange={(changeValue) => {
                setToken(changeValue);
              }}
            />
          </div>
          <div>
            <Button label="Connect" onClick={() => {}} />
            <Button label="DisConnect" onClick={() => {}} />
          </div>
        </div>
        <div id="sub">
          {'sub'}
          <TextInput
            label={'Destination'}
            value={subDestination}
            onChange={(changeValue) => {
              setSubDestination(changeValue);
            }}
          />
          <Button label="Subscribe" onClick={() => {}} />
        </div>
        <div id="pub">
          {'pub'}
          <TextInput
            label={'Destination'}
            value={pubDestination}
            onChange={(changeValue) => {
              setPubDestination(changeValue);
            }}
          />
          <Button label="Publish" onClick={() => {}} />
        </div>
        <div id="log">
          {'Log'}

          <div>
            <Textarea value={log} disabled />
          </div>
        </div>
      </div>
    </>
  );
};

export default StompSettingBody;
