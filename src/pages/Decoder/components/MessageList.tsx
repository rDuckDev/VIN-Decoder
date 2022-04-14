import _ from 'lodash';
import React from 'react';
import {useDecoderContext} from '../../../utils/providers/DecoderContextProvider';
import DecoderResults from '../helpers/DecoderResults';

interface IProps {
  messages: string[];
}

function MessageList({messages = []}: IProps) {
  const {vehicle} = useDecoderContext();
  const attributes = DecoderResults.getAttributeMap();
  const pendingMessages = [];

  // explicit messages
  pendingMessages.push(...messages);

  // implicit messages
  if (!!vehicle) {
    // check for any suggested VINs
    const suggestedVin = vehicle.getAttributeValue(attributes.suggested_vin);
    if (suggestedVin) pendingMessages.push(`Suggested VIN: ${suggestedVin}`);

    // check for any error messages
    const separator = /\s*;\s*/;
    pendingMessages.push(
      ..._.split(vehicle.getAttributeValue(attributes.error_text), separator),
      ..._.split(
        vehicle.getAttributeValue(attributes.additional_error_text),
        separator
      )
    );
  }

  // remove empty messages
  const messageList = _.compact(pendingMessages);

  return (
    <React.Fragment>
      {!!messageList.length && (
        <section className='container mb-3'>
          <ul className='list-group'>
            {messageList.map((message, index) => (
              <li key={index} className='list-group-item list-group-item-light'>
                {message}
              </li>
            ))}
          </ul>
        </section>
      )}
    </React.Fragment>
  );
}

export default React.memo(MessageList);
