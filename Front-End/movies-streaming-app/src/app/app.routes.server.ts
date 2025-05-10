import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'details/:type/:id',
    renderMode: RenderMode.Server // Or 'client'
  },
  {
    path: 'watch/:type/:id',
    renderMode:RenderMode.Server
  },
];
