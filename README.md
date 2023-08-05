# Geo Redirector
We have to provide unique payment links for our customers from different countries with different currencies, With Geo Redirector we can give a single link to all our customers from around the world.

## Video Demo
[![Video Demo](/demo/Thumbnail.png)](https://www.youtube.com/watch?v=oLmwjdXuaPE)

Clicking the above image would open the video in YouTube.

## Demo
[https://geo-redirector.vercel.app](https://geo-redirector.vercel.app)

## How
Geo Redirector is a self-hosted URL redirection application. Add unique URL for each country and get a single URL to share with others. The URL will be redirected to the unique URL according to the visitor's country.

## Screenshots

### Multiple Payment Links for each country on Stripe
![Payment links on Stripe](/demo/stripe-payment-links.png)

### Add Product
![Add Product on Geo Redirector](/demo/addProduct.png)

### Products
![Products page on Geo Redirector](/demo/products_v2.png)

### Redirected Stripe Payment Page
![Stripe Payment Page](/demo/stripe_payment_page.png)

### Analytics
![Analytics page on Geo Redirector](/demo/analytics_map.png)

## Requirements
### MySQL Database
TiDB Cluster in [TiDB Serverless](https://tidbcloud.com/free-trial). (Recommended)

## Deploy
Deploy to Vercel with a single click.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fabishekmuthian%2Fgeo-redirector&env=DATABASE_URL,DEFAULT_COUNTRY&envDescription=DATABASE%20URI%20for%20database%20and%20DEFAULT_COUNTRY%20for%20redirecting%20to%20if%20there%20are%20no%20payment%20links%20for%20the%20visitor's%20country.%20)

## Environment Variables
Create a `.env` file with the following environmental variables.
1. `DATABASE_URL` MySQL database URI.
2. `DEFAULT_COUNTRY` Default country for redirecting to if there are no payment links for the visitor's country. 

## Development
1. Clone the repository.
2. `npm install`
3. `prisma generate`
4. `npm run dev`

### License
The MIT License (MIT)

Copyright (c) 2023 ABISHEK MUTHIAN, SAMARASAM SADASIVAM (geo-redirector.vercel.app)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Licenses for open-source libraries used in this project
Svelte Kit: https://github.com/sveltejs/kit licensed under [The MIT License](https://github.com/sveltejs/kit/blob/master/LICENSE).

prisma: https://github.com/prisma/prisma licensed under [Apache-2.0 license](https://github.com/prisma/prisma/blob/main/LICENSE).

tailwindcss: https://github.com/tailwindlabs/tailwindcss licensed under [The MIT License](https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE).

daisyui: https://github.com/saadeghi/daisyui licensed under [The MIT License](https://github.com/saadeghi/daisyui/blob/master/LICENSE).



