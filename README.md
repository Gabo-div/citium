![App Screenshot](banner.png)

# Citium

Citium es una agencia especializada en desarrollo y diseño web. En este monorepo se escuentran la pagina principal y paquetes utilizados para el desarrollo de un CMS.

#### Aplicaciones

- `apps/web`: Pagina web de [Citium](https://www.citium.dev/)

#### Demos

- `demos/cms-demo`: Ejemplo de uso del CMS.

#### Paquetes

- `@citium/cms`: Paquete principal del CMS.
- `@citium/sqlite-adapter`: Adaptador de SQLite (LibSQL) para el CMS.
- `@citium/types`: Tipos de datos y validadores compartidos.
- `@citium/typescript-config`: Configuracion compartida de `typescript`.
- `@citium/eslint-config`: Configuracion compartida de `eslint`.

### Compilar

Para compilar todas las aplicaciones y paquetes, ejecute el siguiente comando:

```
pnpm build
```

### Desarrollar

Para desarrollar todas las aplicaciones y paquetes, ejecute el siguiente comando:

```
pnpm dev
```
