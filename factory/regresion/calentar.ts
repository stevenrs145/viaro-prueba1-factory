// Antes de cada ejecución, un navegador real abre el formulario del examen una vez. Tras purgar cachés, TinyMCE y los
// módulos AMD tardan más de 20 s en generarse; si le toca a la primera prueba, agota sus esperas sin que nada esté roto.
import { chromium } from '@playwright/test';
import { login } from './helpers';

export default async function calentar() {
  const navegador = await chromium.launch();
  const page = await navegador.newPage({ baseURL: process.env.BASE_URL || 'http://localhost:8090', locale: 'es-GT' });
  page.setDefaultTimeout(120_000);
  await login(page, 'profesor');
  await page.goto('/course/view.php?name=QA101');
  const curso = await page.evaluate(() => (window as any).M.cfg.courseId);
  await page.goto(`/course/modedit.php?add=quiz&course=${curso}&section=0`);
  await page.waitForFunction(() => (window as any).M?.util?.pending_js?.length === 0, undefined, { timeout: 120_000 });
  await navegador.close();
}
