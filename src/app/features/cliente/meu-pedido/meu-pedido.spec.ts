import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPedido } from './meu-pedido';

describe('MeuPedido', () => {
  let component: MeuPedido;
  let fixture: ComponentFixture<MeuPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuPedido],
    }).compileComponents();

    fixture = TestBed.createComponent(MeuPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
