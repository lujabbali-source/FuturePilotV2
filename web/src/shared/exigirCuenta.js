/**
 * Importar este archivo protege la pagina.
 *
 * Existe separado de sessionGuard.js porque importar aquel no puede tener
 * efectos: la pagina de login necesita `destinoSeguro()` de alli, y si el
 * simple import redirigiera, el login se echaria a si mismo fuera.
 *
 * Tiene que ser el PRIMER import del punto de entrada. Los imports de un
 * modulo ES se evaluan en orden y todos antes del cuerpo, asi que un
 * `exigirCuenta()` escrito en el cuerpo de main.js correria despues de que
 * app.js ya se hubiera ejecutado entero.
 */
import { exigirCuenta } from "./sessionGuard.js";

exigirCuenta();
