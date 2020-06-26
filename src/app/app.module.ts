import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GoodsgridComponent } from './components/goods-grid/goods-grid.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GoodsModalComponent } from './components/goods-modal/goods-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GoodsgridComponent,
    HeaderComponent,
    FooterComponent,
    GoodsModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
