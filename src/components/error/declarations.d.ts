// Типізація для PNG файлів
declare module "*.png" {
    const value: string;
    export default value;
  }
  
  // Типізація для модульних SCSS файлів
  declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
  }
  