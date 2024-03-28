using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace מגדלי_טוויטר
{
    internal class Program
    {
        public enum Options { REC_TOWER = 1, TRI_TOWER, EXIT }

        static void Main(string[] args)
        {
            Options choose = 0;
            int Height, Width;

            while (choose != Options.EXIT)
            {
                Console.WriteLine("Choose an option:");
                Console.WriteLine("1. Rectangle Tower");
                Console.WriteLine("2. Triangle Tower");
                Console.WriteLine("3. Exit");

                // Read user input
                if (!Enum.TryParse(Console.ReadLine(), out choose) || choose < Options.REC_TOWER || choose > Options.EXIT)
                {
                    Console.WriteLine("Invalid option. Please try again.");
                    //continue;
                }

                else
                {

                    switch (choose)
                    {
                        case Options.REC_TOWER:
                            {
                                Console.WriteLine("You chose Rectangle Tower.");
                                Console.WriteLine("Enter the height and width of the tower");
                                Height = int.Parse(Console.ReadLine());
                                Width = int.Parse(Console.ReadLine());
                                if (Math.Abs(Height - Width) > 5 || Height == Width)// אם מדובר בריבוע או במלבן שההפרש בין צלעותיו גדול מ5
                                    Console.WriteLine($"The area of the rectangle is: {Height * Width}");
                                else Console.WriteLine($"The perimeter of the rectangle is {Height * 2 + Width * 2}");
                                break;
                            }
                        case Options.TRI_TOWER:
                            {
                                Console.WriteLine("You chose Triangle Tower.");
                                Console.WriteLine("Enter the height and width of the tower");
                                Height= int.Parse(Console.ReadLine());
                                Width= int.Parse(Console.ReadLine());
                                Console.WriteLine("Press 1 to calculate the perimeter of the triangle and 2 to print the triangle: ");
                                int Tri_choose=int.Parse(Console.ReadLine());   
                                switch(Tri_choose)
                                {
                                    case 1:
                                        double Perimeter = 2 * Math.Sqrt(Math.Pow(Height, 2) + Math.Pow(Width / 2, 2)) + Width;
                                        Console.WriteLine($"The perimeter of the triangle you chose: {Perimeter}");
                                        break;
                                    case 2:
                                        if (Width % 2 == 0 || Width > Height * 2)
                                            Console.WriteLine("The triangle cannot be printed");
                                        else
                                      
                                        {
                                            int numOfEezugi = Width / 2 - 1;
                                            int numOfLines = 1;
                                            if(numOfEezugi!=0)  numOfLines = (Height - 2) / numOfEezugi; 
                                            int number = 1;
                                            int dabel = 0;
                                              if (numOfEezugi != 0) dabel=(Height - 2) % numOfEezugi;
                                            int spaces;

                                            for (int i = 1; i <= Height;)
                                            {
                                                spaces = (Width - number) / 2;
                                                for (int j = 0; j < numOfLines; j++)
                                                {
                                                    if (i == 1 || i == Height)
                                                         j = numOfLines;
                                                    else if (i == 2 && dabel != 0)
                                                        j -= dabel;

                                                    for (int k = 1; k <= spaces; k++)
                                                    {
                                                        Console.Write(" ");
                                                    }

                                                    for (int k = 1; k <= number; k++)
                                                    {
                                                        Console.Write("*");
                                                    }

                                                    for (int k = 1; k <= spaces; k++)
                                                    {
                                                        Console.Write(" ");
                                                    }

                                                    Console.WriteLine();
                                                    i++;
                                                }
                                                
                                                number += 2;
                                            }

                                        }
                                break;
                                    default:
                                        Console.WriteLine("An invalid selection was entered!");
                                        break;
                                }
                                break;
                            }
                        case Options.EXIT:
                            {
                                Console.WriteLine("Exiting the program.");
                                break;
                            }
                        default:
                            {
                                Console.WriteLine("Invalid option.");
                                break;
                            }
                    }
                }
            }
        }
    }
}


