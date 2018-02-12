 class toDoDomain
{
  public Id: string = '';
  public Name: string = '';
  public Description: string = '';
  public IsCompleted: boolean = false;
  public Priority: Number = 0;
}


 let priorities: { } [] = [
  { key: 1, value: 'Severe' },
  { key: 2, value: 'High' },
  { key: 3, value: 'Moderate' },
  { key: 4, value: 'Low' }
]

export { toDoDomain, priorities}







