-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "primerNombre" TEXT NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "segundoApellido" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "numeroCelular" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "telefonoCasa" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudadDireccion" TEXT NOT NULL,
    "departamentoDireccion" TEXT NOT NULL,
    "codigoPostalDireccion" TEXT NOT NULL,
    "paisDireccion" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "especializacionEmpleo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
