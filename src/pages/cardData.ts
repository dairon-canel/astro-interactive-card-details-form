import type { APIContext } from 'astro';

// File routes export a get() function, which gets called to generate the file.
// Return an object with `body` to save the file contents in your final build.
// If you export a post() function, you can catch post requests, and respond accordingly
export async function post({ request, cookies, redirect }: APIContext) {
  const errors = {
    ownerName: '',
    cardNumber: '',
    expDate: '',
    cvcNumber: '',
  };

  const formData = await request.formData();

  const ownerName = formData.get('ownerName');
  const cardNumber = formData.get('cardNumber');
  const expDateM = formData.get('expDateM');
  const expDateY = formData.get('expDateY');
  const cvcNumber = formData.get('cvcNumber');

  cookies.set('cardData', {
    ownerName,
    cardNumber,
    expDateM,
    expDateY,
    cvcNumber,
  });

  if (typeof ownerName !== 'string') {
    errors.ownerName += 'Please enter a card holder name. \n';
  }
  if ((ownerName as string).length >= 32) {
    errors.ownerName += 'Card holder name must have less than 32 chars. \n';
  }
  if (typeof cardNumber !== 'string') {
    errors.cardNumber += 'Card number is not valid. \n';
  }
  if ((cardNumber as string).length !== 16) {
    errors.cardNumber += 'Card number must have 16 chars. \n';
  }
  if (typeof expDateM !== 'string') {
    errors.expDate += 'Please enter a month date. \n';
  }
  if ((expDateM as string) === '00') {
    errors.expDate += 'The month date must be a number from 1 to 12. \n';
  }
  if ((expDateM as string).length !== 2) {
    errors.expDate += 'Month must have 2 chars. \n';
  }
  if (typeof expDateY !== 'string') {
    errors.expDate += 'Please enter a year date. \n';
  }
  if ((expDateY as string).length !== 2) {
    errors.expDate += 'Year must have 2 chars. \n';
  }
  if (typeof cvcNumber !== 'string') {
    errors.cvcNumber += 'Password must be at least 6 characters. ';
  }
  if ((cvcNumber as string).length !== 3) {
    errors.cvcNumber += 'Year must have 3 chars. \n';
  }

  if (Object.values(errors).some(e => e !== '')) {
    cookies.set('errors', errors);

    return redirect('/', 301);
  }

  cookies.set('success', 'done');
  return redirect('/success', 301);
}
