import type { APIContext } from 'astro';

// File routes export a get() function, which gets called to generate the file.
// Return an object with `body` to save the file contents in your final build.
// If you export a post() function, you can catch post requests, and respond accordingly
export async function post({ request, cookies, redirect }: APIContext) {
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
  console.log('serverrrr');
  return redirect('/success', 301);
}
