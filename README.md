# Mini software factory — módulo de exámenes de Moodle (Viaro, prueba 1)

> En construcción. Las instrucciones de instalación desde cero se completan y se verifican
> en una carpeta limpia antes de la entrega.

## Estructura

```
README.md          cómo levantar y correr todo, desde cero
documentacion.md   entregable 4
cobertura.md       entregable 3
specs/             ENTRADAS: specs escritas por producto (agregado: no está en la estructura pedida;
                   se mantiene separado de salidas/ para que la entrada nunca se confunda con lo generado)
factory/           el pipeline y el control de verificación honesta
entorno/           setup reproducible de Moodle 5.3
salidas/spec-N/    código generado, pruebas generadas, trazabilidad.md, cambios.diff
corridas/<fecha>/  evidencia de cada corrida completa
visual/            líneas base versionadas y diferencias de la corrida que falló a propósito
ia/                rastro de cómo se dirigió la IA
```

## Requisitos
Windows con WSL2 (o Linux x86_64), Docker, Git, Node 20+ y npm.
