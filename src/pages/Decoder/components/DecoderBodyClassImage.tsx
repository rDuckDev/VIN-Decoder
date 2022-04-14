import React from 'react';
import {useDecoderContext} from '../../../utils/providers/DecoderContextProvider';
import DecoderResults from '../helpers/DecoderResults';

function DecoderBodyClassImage() {
  const {vehicle} = useDecoderContext();
  const attributes = DecoderResults.getAttributeMap();

  const bodyClass = vehicle
    ? vehicle.getAttribute(attributes.body_class)
    : undefined;

  return (
    <React.Fragment>
      {!!bodyClass && !!bodyClass.ValueId && (
        <section className='container my-3'>
          <section className='card'>
            <section className='card-body row justify-content-center g-0'>
              <section className='col-10 col-md-8 col-lg-6'>
                <img
                  alt={`A likeness of the ${bodyClass.Value} body type`}
                  src={`${process.env.PUBLIC_URL}/images/body-class/${bodyClass.ValueId}.png`}
                  className='img-fluid w-100'
                />
              </section>
            </section>
          </section>
        </section>
      )}
    </React.Fragment>
  );
}

export default React.memo(DecoderBodyClassImage);
