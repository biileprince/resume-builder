import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  async generatePdf(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true, // headless mode is true by default now, but let's be explicit
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // Set HTML content and wait until there are no network connections for at least 500 ms
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    });

    await browser.close();

    // puppeteer's page.pdf returns a Uint8Array, Buffer.from converts it to a Node Buffer
    return Buffer.from(pdfBuffer);
  }
}
